
import { 
  OPERATION_DEFINITION,
  FRAGMENT_DEFINITION,
} from 'graphql/language/kinds';


import type { 
  DocumentNode, 
  OperationDefinitionNode 
} from 'graphql/language/ast';

// Find definitions in GraphQL query
export function getOperationAST(
  documentAST: DocumentNode,
  operationName: ?string,
  definitionType = OPERATION_DEFINITION
){
  
  console.log("parse getOperationAST definitionType", definitionType, OPERATION_DEFINITION);

  let operation = null;
  for (let i = 0; i < documentAST.definitions.length; i++) {
    const definition = documentAST.definitions[i];
    if (definition.kind === definitionType) {
      if (!operationName) {
        // If no operation name was provided, only return an Operation if there
        // is one defined in the document. Upon encountering the second, return
        // null.
        if (operation) {
          return null;
        }
        operation = definition;
      } else if (definition.name && definition.name.value === operationName) {
        return definition;
      }
    }
  }
  return operation;
}
