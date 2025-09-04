import z from "zod";

const dropDownSchemaOpt = z
  .object({
    value: z.string(),
    label: z.string(),
  })


  export {
  dropDownSchemaOpt,
  
};
