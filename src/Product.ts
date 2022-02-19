import {Directive, Field, ID, ObjectType} from "type-graphql";

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Product {

    @Field(type => ID)
    id?: string;

    @Field()
    name?: string;

    @Field()
    description?: string;

}