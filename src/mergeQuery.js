
import {
  // buildSchema,
  concatAST,
  // getOperationAST,
} from 'graphql/utilities';
import { parse } from 'graphql/language/parser';
import { print } from 'graphql/language/printer';


const mergeQuery = function(query, additionQuery){

  if(!query || !additionQuery){
    return query;
  }

  let schema = parse(query);

  let newSchema = parse(additionQuery);

  if(newSchema && newSchema.definitions){

    // Удаляем имеющиеся сходные объявления
    newSchema.definitions.map(definition => {
  
      const {
        kind,
        name,
      } = definition;
  
      if(kind && name && name.value){
  
        const index = schema.definitions.findIndex(n => (n && (n.kind === kind) && (n.name && n.name.value === name.value)));
  
        if(index !== -1){
          schema.definitions.splice(index, 1);
        }
  
      }
  
    });
  
    schema = concatAST([schema, newSchema]);
  }
  
  return print(schema);

}

export default mergeQuery