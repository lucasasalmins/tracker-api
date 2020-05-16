
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  debugLib
} = require('./runtime')

const path = require('path')
const fs = require('fs')
const debug = debugLib('prisma-client')

/**
 * Query Engine version: 2accb9c7eacdc984874eaeb63377fe705dfd3203
 * Prisma Client JS version: 2.0.0-beta.1
 */
exports.prismaVersion = {
  engine: "2accb9c7eacdc984874eaeb63377fe705dfd3203",
  client: "2.0.0-beta.1"
}

exports.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = PrismaClientRustPanicError;
exports.PrismaClientInitializationError = PrismaClientInitializationError;
exports.PrismaClientValidationError = PrismaClientValidationError;


/**
 * Build tool annotations
 * In order to make `ncc` and `node-file-trace` happy.
**/

path.join(__dirname, 'runtime/query-engine-darwin');
path.join(__dirname, 'runtime/query-engine-debian-openssl-1.1.x');

/**
 * Annotation for Zeit Now
**/
path.join(__dirname, 'schema.prisma');

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.OrderByArg = makeEnum({
  asc: 'asc',
  desc: 'desc'
});


/**
 * DMMF
 */
const dmmfString = "{\"datamodel\":{\"enums\":[],\"models\":[{\"name\":\"User\",\"isEmbedded\":false,\"dbName\":null,\"fields\":[{\"name\":\"createdAt\",\"kind\":\"scalar\",\"dbNames\":[\"created_at\"],\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"dbNames\":[],\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstName\",\"kind\":\"scalar\",\"dbNames\":[\"first_name\"],\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"googleId\",\"kind\":\"scalar\",\"dbNames\":[\"google_id\"],\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"googleImageUrl\",\"kind\":\"scalar\",\"dbNames\":[\"google_image_url\"],\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id\",\"kind\":\"scalar\",\"dbNames\":[],\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastName\",\"kind\":\"scalar\",\"dbNames\":[\"last_name\"],\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"dbNames\":[],\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"scalar\",\"dbNames\":[],\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"dbNames\":[\"updated_at\"],\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"isGenerated\":false,\"documentation\":\"timestamps (createdAt, updatedAt) are stored as unix timestamps\\\\ncreated using Date.now() (easier to test and considers timezone)\",\"idFields\":[],\"uniqueFields\":[]}]},\"mappings\":[{\"model\":\"User\",\"plural\":\"users\",\"findOne\":\"findOneUser\",\"findMany\":\"findManyUser\",\"create\":\"createOneUser\",\"delete\":\"deleteOneUser\",\"update\":\"updateOneUser\",\"deleteMany\":\"deleteManyUser\",\"updateMany\":\"updateManyUser\",\"upsert\":\"upsertOneUser\",\"aggregate\":\"aggregateUser\"}],\"schema\":{\"enums\":[{\"name\":\"OrderByArg\",\"values\":[\"asc\",\"desc\"]}],\"outputTypes\":[{\"name\":\"User\",\"fields\":[{\"name\":\"createdAt\",\"args\":[],\"outputType\":{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}},{\"name\":\"email\",\"args\":[],\"outputType\":{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}},{\"name\":\"firstName\",\"args\":[],\"outputType\":{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}},{\"name\":\"googleId\",\"args\":[],\"outputType\":{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}},{\"name\":\"googleImageUrl\",\"args\":[],\"outputType\":{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}},{\"name\":\"id\",\"args\":[],\"outputType\":{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}},{\"name\":\"lastName\",\"args\":[],\"outputType\":{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}},{\"name\":\"password\",\"args\":[],\"outputType\":{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}},{\"name\":\"role\",\"args\":[],\"outputType\":{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}},{\"name\":\"updatedAt\",\"args\":[],\"outputType\":{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}}]},{\"name\":\"AggregateUser\",\"fields\":[{\"name\":\"count\",\"args\":[{\"name\":\"where\",\"inputType\":[{\"type\":\"UserWhereInput\",\"kind\":\"object\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"orderBy\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"type\":\"UserOrderByInput\",\"kind\":\"object\"}]},{\"name\":\"skip\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"after\",\"inputType\":[{\"type\":\"UserWhereUniqueInput\",\"kind\":\"object\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"before\",\"inputType\":[{\"type\":\"UserWhereUniqueInput\",\"kind\":\"object\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"first\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"last\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]}],\"outputType\":{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}}]},{\"name\":\"Query\",\"fields\":[{\"name\":\"findManyUser\",\"args\":[{\"name\":\"where\",\"inputType\":[{\"type\":\"UserWhereInput\",\"kind\":\"object\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"orderBy\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"type\":\"UserOrderByInput\",\"kind\":\"object\"}]},{\"name\":\"skip\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"after\",\"inputType\":[{\"type\":\"UserWhereUniqueInput\",\"kind\":\"object\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"before\",\"inputType\":[{\"type\":\"UserWhereUniqueInput\",\"kind\":\"object\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"first\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"last\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]}],\"outputType\":{\"type\":\"User\",\"kind\":\"object\",\"isRequired\":true,\"isList\":true}},{\"name\":\"aggregateUser\",\"args\":[],\"outputType\":{\"type\":\"AggregateUser\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}},{\"name\":\"findOneUser\",\"args\":[{\"name\":\"where\",\"inputType\":[{\"type\":\"UserWhereUniqueInput\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}]}],\"outputType\":{\"type\":\"User\",\"kind\":\"object\",\"isRequired\":false,\"isList\":false}}]},{\"name\":\"BatchPayload\",\"fields\":[{\"name\":\"count\",\"args\":[],\"outputType\":{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}}]},{\"name\":\"Mutation\",\"fields\":[{\"name\":\"createOneUser\",\"args\":[{\"name\":\"data\",\"inputType\":[{\"type\":\"UserCreateInput\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}]}],\"outputType\":{\"type\":\"User\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}},{\"name\":\"deleteOneUser\",\"args\":[{\"name\":\"where\",\"inputType\":[{\"type\":\"UserWhereUniqueInput\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}]}],\"outputType\":{\"type\":\"User\",\"kind\":\"object\",\"isRequired\":false,\"isList\":false}},{\"name\":\"updateOneUser\",\"args\":[{\"name\":\"data\",\"inputType\":[{\"type\":\"UserUpdateInput\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}]},{\"name\":\"where\",\"inputType\":[{\"type\":\"UserWhereUniqueInput\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}]}],\"outputType\":{\"type\":\"User\",\"kind\":\"object\",\"isRequired\":false,\"isList\":false}},{\"name\":\"upsertOneUser\",\"args\":[{\"name\":\"where\",\"inputType\":[{\"type\":\"UserWhereUniqueInput\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}]},{\"name\":\"create\",\"inputType\":[{\"type\":\"UserCreateInput\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}]},{\"name\":\"update\",\"inputType\":[{\"type\":\"UserUpdateInput\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}]}],\"outputType\":{\"type\":\"User\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}},{\"name\":\"updateManyUser\",\"args\":[{\"name\":\"data\",\"inputType\":[{\"type\":\"UserUpdateManyMutationInput\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}]},{\"name\":\"where\",\"inputType\":[{\"type\":\"UserWhereInput\",\"kind\":\"object\",\"isRequired\":false,\"isList\":false}]}],\"outputType\":{\"type\":\"BatchPayload\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}},{\"name\":\"deleteManyUser\",\"args\":[{\"name\":\"where\",\"inputType\":[{\"type\":\"UserWhereInput\",\"kind\":\"object\",\"isRequired\":false,\"isList\":false}]}],\"outputType\":{\"type\":\"BatchPayload\",\"kind\":\"object\",\"isRequired\":true,\"isList\":false}},{\"name\":\"executeRaw\",\"args\":[{\"name\":\"query\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}]},{\"name\":\"parameters\",\"inputType\":[{\"type\":\"Json\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]}],\"outputType\":{\"type\":\"Json\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}}]}],\"inputTypes\":[{\"name\":\"UserWhereInput\",\"fields\":[{\"name\":\"createdAt\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"Int\"},{\"type\":\"IntFilter\",\"isList\":false,\"isRequired\":false,\"kind\":\"object\"}],\"isRelationFilter\":false},{\"name\":\"email\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"},{\"type\":\"StringFilter\",\"isList\":false,\"isRequired\":false,\"kind\":\"object\"}],\"isRelationFilter\":false},{\"name\":\"firstName\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"},{\"type\":\"NullableStringFilter\",\"isList\":false,\"isRequired\":false,\"kind\":\"object\"},{\"type\":\"null\",\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\"}],\"isRelationFilter\":false},{\"name\":\"googleId\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"},{\"type\":\"NullableStringFilter\",\"isList\":false,\"isRequired\":false,\"kind\":\"object\"},{\"type\":\"null\",\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\"}],\"isRelationFilter\":false},{\"name\":\"googleImageUrl\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"},{\"type\":\"NullableStringFilter\",\"isList\":false,\"isRequired\":false,\"kind\":\"object\"},{\"type\":\"null\",\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\"}],\"isRelationFilter\":false},{\"name\":\"id\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"Int\"},{\"type\":\"IntFilter\",\"isList\":false,\"isRequired\":false,\"kind\":\"object\"}],\"isRelationFilter\":false},{\"name\":\"lastName\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"},{\"type\":\"NullableStringFilter\",\"isList\":false,\"isRequired\":false,\"kind\":\"object\"},{\"type\":\"null\",\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\"}],\"isRelationFilter\":false},{\"name\":\"password\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"},{\"type\":\"StringFilter\",\"isList\":false,\"isRequired\":false,\"kind\":\"object\"}],\"isRelationFilter\":false},{\"name\":\"role\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"},{\"type\":\"StringFilter\",\"isList\":false,\"isRequired\":false,\"kind\":\"object\"}],\"isRelationFilter\":false},{\"name\":\"updatedAt\",\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"Int\"},{\"type\":\"IntFilter\",\"isList\":false,\"isRequired\":false,\"kind\":\"object\"}],\"isRelationFilter\":false},{\"name\":\"AND\",\"inputType\":[{\"type\":\"UserWhereInput\",\"kind\":\"object\",\"isRequired\":false,\"isList\":true}],\"isRelationFilter\":true},{\"name\":\"OR\",\"inputType\":[{\"type\":\"UserWhereInput\",\"kind\":\"object\",\"isRequired\":false,\"isList\":true}],\"isRelationFilter\":true},{\"name\":\"NOT\",\"inputType\":[{\"type\":\"UserWhereInput\",\"kind\":\"object\",\"isRequired\":false,\"isList\":true}],\"isRelationFilter\":true}],\"isWhereType\":true,\"atLeastOne\":false},{\"name\":\"UserWhereUniqueInput\",\"fields\":[{\"name\":\"email\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"id\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]}],\"atLeastOne\":true},{\"name\":\"UserCreateInput\",\"fields\":[{\"name\":\"createdAt\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}]},{\"name\":\"email\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}]},{\"name\":\"firstName\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"googleId\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"googleImageUrl\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"lastName\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"password\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}]},{\"name\":\"role\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}]},{\"name\":\"updatedAt\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":true,\"isList\":false}]}]},{\"name\":\"UserUpdateInput\",\"fields\":[{\"name\":\"createdAt\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"email\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"firstName\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"googleId\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"googleImageUrl\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"id\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"lastName\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"password\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"role\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"updatedAt\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]}]},{\"name\":\"UserUpdateManyMutationInput\",\"fields\":[{\"name\":\"createdAt\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"email\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"firstName\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"googleId\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"googleImageUrl\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"id\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"lastName\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"password\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"role\",\"inputType\":[{\"type\":\"String\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]},{\"name\":\"updatedAt\",\"inputType\":[{\"type\":\"Int\",\"kind\":\"scalar\",\"isRequired\":false,\"isList\":false}]}]},{\"name\":\"IntFilter\",\"fields\":[{\"name\":\"equals\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"Int\"}]},{\"name\":\"not\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"Int\"},{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"IntFilter\"}]},{\"name\":\"in\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":true,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"Int\"}]},{\"name\":\"notIn\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":true,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"Int\"}]},{\"name\":\"lt\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"Int\"}]},{\"name\":\"lte\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"Int\"}]},{\"name\":\"gt\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"Int\"}]},{\"name\":\"gte\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"Int\"}]}],\"atLeastOne\":false},{\"name\":\"StringFilter\",\"fields\":[{\"name\":\"equals\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"not\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"},{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"StringFilter\"}]},{\"name\":\"in\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":true,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"notIn\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":true,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"lt\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"lte\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"gt\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"gte\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"contains\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"startsWith\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"endsWith\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]}],\"atLeastOne\":false},{\"name\":\"NullableStringFilter\",\"fields\":[{\"name\":\"equals\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"},{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"null\"}]},{\"name\":\"not\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"},{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"null\"},{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"NullableStringFilter\"}]},{\"name\":\"in\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":true,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"notIn\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":true,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"lt\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"lte\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"gt\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"gte\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"contains\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"startsWith\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]},{\"name\":\"endsWith\",\"isRelationFilter\":false,\"inputType\":[{\"isList\":false,\"isRequired\":false,\"kind\":\"scalar\",\"type\":\"String\"}]}],\"atLeastOne\":false},{\"name\":\"UserOrderByInput\",\"atLeastOne\":true,\"atMostOne\":true,\"isOrderType\":true,\"fields\":[{\"name\":\"createdAt\",\"inputType\":[{\"type\":\"OrderByArg\",\"isList\":false,\"isRequired\":false,\"kind\":\"enum\"}],\"isRelationFilter\":false},{\"name\":\"email\",\"inputType\":[{\"type\":\"OrderByArg\",\"isList\":false,\"isRequired\":false,\"kind\":\"enum\"}],\"isRelationFilter\":false},{\"name\":\"firstName\",\"inputType\":[{\"type\":\"OrderByArg\",\"isList\":false,\"isRequired\":false,\"kind\":\"enum\"}],\"isRelationFilter\":false},{\"name\":\"googleId\",\"inputType\":[{\"type\":\"OrderByArg\",\"isList\":false,\"isRequired\":false,\"kind\":\"enum\"}],\"isRelationFilter\":false},{\"name\":\"googleImageUrl\",\"inputType\":[{\"type\":\"OrderByArg\",\"isList\":false,\"isRequired\":false,\"kind\":\"enum\"}],\"isRelationFilter\":false},{\"name\":\"id\",\"inputType\":[{\"type\":\"OrderByArg\",\"isList\":false,\"isRequired\":false,\"kind\":\"enum\"}],\"isRelationFilter\":false},{\"name\":\"lastName\",\"inputType\":[{\"type\":\"OrderByArg\",\"isList\":false,\"isRequired\":false,\"kind\":\"enum\"}],\"isRelationFilter\":false},{\"name\":\"password\",\"inputType\":[{\"type\":\"OrderByArg\",\"isList\":false,\"isRequired\":false,\"kind\":\"enum\"}],\"isRelationFilter\":false},{\"name\":\"role\",\"inputType\":[{\"type\":\"OrderByArg\",\"isList\":false,\"isRequired\":false,\"kind\":\"enum\"}],\"isRelationFilter\":false},{\"name\":\"updatedAt\",\"inputType\":[{\"type\":\"OrderByArg\",\"isList\":false,\"isRequired\":false,\"kind\":\"enum\"}],\"isRelationFilter\":false}]}]}}"

// We are parsing 2 times, as we want independent objects, because
// DMMFClass introduces circular references in the dmmf object
const dmmf = JSON.parse(dmmfString)
exports.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */

const config = {
  "generator": {
    "name": "client",
    "provider": "prisma-client-js",
    "output": "/Users/lucassalmins/las/tracker-api/node_modules/@prisma/client",
    "binaryTargets": [
      "native",
      "debian-openssl-1.1.x"
    ],
    "config": {},
    "documentation": "https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/generators\nnative selects the platform for local development\ndebian-openssl-1.1.x is required for GCP AppEngine"
  },
  "sqliteDatasourceOverrides": [],
  "relativePath": "../../../prisma",
  "internalDatasources": [
    {
      "name": "db",
      "connectorType": "postgresql",
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": "postgresql://lucassalmins@localhost:5432/dev?schema=idm"
      },
      "documentation": "https://www.prisma.io/docs/reference/database-connectors/postgresql\nthis will take DATABASE_URL from the environment, then look in the local .env file"
    }
  ]
}
config.document = dmmf
config.dirname = __dirname

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient