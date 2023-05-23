import { mkdir, readFile, writeFile } from "fs/promises";
import { format } from "prettier";

const primitiveTypesMap = {
  int: "number",
  long: "number",
  Long: "number",
  String: "string",
  UUID: "string",
  Float: "number",
  Map: "Map<any, any>",
} as const;

type PrimitiveType = keyof typeof primitiveTypesMap;

type FieldDefinition = {
  type: PrimitiveType | string;
  required?: boolean;
  list?: boolean;
  doc?: string;
  example?: string;
  version?: string;
};

type TypeDefinition = {
  fields: Record<string, FieldDefinition>;
  doc?: string;
  deprecated?: boolean;
  removal_date?: number;
  error?: boolean;
};

type ActionDefinition = {
  request: string;
  response?: string;
  errors?: { name: string }[];
  doc?: string;
};

type VersionString = `v${number}`;

type Protocol = {
  types: Record<VersionString, Record<string, TypeDefinition>>;
  actions: Record<VersionString, Record<string, ActionDefinition>>;
};

function getTypeName(type: string) {
  if (type in primitiveTypesMap) {
    return primitiveTypesMap[type as PrimitiveType];
  }
  return type;
}

function sanitizeFieldName(name: string) {
  if (name.includes("-")) {
    return `"${name}"`;
  }

  return name;
}

async function generateType(name: string, typeDefinition: TypeDefinition) {
  const typeFile = `
export type ${name} = {
${Object.entries(typeDefinition.fields)
  .map(([fieldName, fieldDefinition]) => {
    const type = getTypeName(fieldDefinition.type);

    return `  ${sanitizeFieldName(fieldName)}${
      name.endsWith("Request") && !fieldDefinition.required ? "?" : ""
    }: ${type}${fieldDefinition.list ? "[]" : ""};`;
  })
  .join("\n")}
}
`;

  return typeFile;
}

async function generateAction(
  name: string,
  actionDefinition: ActionDefinition
) {
  const actionFile = `
export const ${name} = async (client: Client, data: ${
    actionDefinition.request
  }) => {
  const request = {
    ...data,
    type: "${name}",
    version: "v1"
  }

  return client.submit${
    actionDefinition.response
      ? `<${getTypeName(actionDefinition.response)}>`
      : ""
  }(request)
}
 `;

  return actionFile;
}

async function generate() {
  const protocol = JSON.parse(
    await readFile("./protocol.json", { encoding: "utf-8" })
  ) as Protocol;

  await Promise.all(
    Object.entries(protocol.types).map(async ([version, types]) => {
      console.log(`Generate ${version} types`);

      const generatedTypes = await Promise.all(
        Object.entries(types).map(async ([name, typeDefinition]) =>
          generateType(name, typeDefinition)
        )
      ).then((generatedTypes) => generatedTypes.join(""));

      // some types used in v1 are defined in v0
      const foreignVersionTypes = Array.from(
        Object.entries(types)
          .flatMap(([name, typeDefinition]) =>
            Object.entries(typeDefinition.fields).map(
              ([fieldName, fieldDefinition]) =>
                fieldDefinition.version && fieldDefinition.version !== version
                  ? {
                      type: fieldDefinition.type,
                      version: fieldDefinition.version,
                    }
                  : null
            )
          )
          .filter((x) => x !== null)
          .reduce(
            (accumulator, current) =>
              accumulator.set(
                current!.version,
                accumulator.get(current!.version)?.concat(current!.type) ?? [
                  current!.type,
                ]
              ),
            new Map<string, string[]>()
          )
          .entries()
      )
        .map(
          ([version, types]) =>
            `import { ${types.join(", ")} } from "../${version}/types";`
        )
        .join("\n");

      try {
        await mkdir(`./src/${version}`);
      } catch (e) {
        // already exists.. probably
      }

      writeFile(
        `./src/${version}/types.ts`,
        format(foreignVersionTypes.concat(generatedTypes), {
          parser: "typescript",
        })
      );
    })
  );

  console.log(`Generate v1 actions`);
  const actions = protocol.actions["v1"]!;

  const allActions = await Promise.all(
    Object.entries(actions).map(([name, actionDefinition]) =>
      generateAction(name, actionDefinition)
    )
  );

  const typeImports = Object.values(actions)
    .flatMap((action) => [action.request, action.response])
    .filter((type) => type && !(type in primitiveTypesMap))
    .filter((type, index, array) => array.indexOf(type) === index);

  const imports = `import { Client } from "../client";
import { ${typeImports.join(", ")} } from "./types";
\n\n`;

  writeFile(
    `./src/v1/actions.ts`,
    format(imports.concat(allActions.join("")), { parser: "typescript" })
  );
}

generate();
