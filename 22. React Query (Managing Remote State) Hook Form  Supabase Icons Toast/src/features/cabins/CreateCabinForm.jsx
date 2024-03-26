import {  useMutation,  useQueryClient} from "@tanstack/react-query";
import toast  from "react-hot-toast";
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form"; 
import { createEditCabin } from "../../services/apiCabins";
import FormRowComp from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({cabinToEdit = {} }) {
  const { id : editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues : isEditSession ? editValues : {},
  });
  const {errors} = formState;  /*  console.log(errors); */

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  // ! Here also convert with Custom Hook
  // const queryClient = useQueryClient();
  // const { mutate : createCabin, isLoading: isCreating } = useMutation({
  //   mutationFn: createEditCabin,
  //   onSuccess: () => {
  //     toast.success("New Cabin succesfully created");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     reset();
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  // ! Here also convert with Custom Hook
  // const { mutate : editCabin, isLoading: isEditing } = useMutation({
  //   mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
  //   onSuccess: () => {
  //     toast.success("Cabin succesfully edited");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     reset();
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if(isEditSession) editCabin({newCabinData : {...data, image}, id : editId}, {
      onSuccess : (data) => {
        reset();
      },
    });
    else createCabin({...data, image : image}, {
      onSuccess : (data) => {
        // console.log(data);   {id: 19, created_at: '2024-03-24T06:00:07.88422+00:00', name: '004', maxCapacity: 4, regularPrice: 400, …}
        reset();
      },
    });
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error> }
      </FormRow> */}

      <FormRowComp label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isWorking} {...register("name", { required: "This field is required" })} />
      </FormRowComp>
      {/* // ! Yeni 2 curde istifade ede bilerik */}

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
        {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error> }
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
        {errors?.regularPrice?.message && <Error>{errors.regularPrice.message}</Error> }  
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", { 
            required: "This field is required",
            validate : (value) => value < getValues().regularPrice || "Discount should be less than price",
           })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error> }  
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
        {errors?.description?.message && <Error>{errors.description.message}</Error> }  
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" /* type="file" */ {...register("image", { required : isEditSession ? false : "This field is required"})} />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
