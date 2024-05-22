import { useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

type Event = NativeSyntheticEvent<TextInputChangeEventData>;

type FieldOption = {
  initialValue: string;
};

type FormValues = { [key: string]: string };
type FieldsOptions = { [key: string]: FieldOption };

const useForm = (initialValues: FormValues, options?: FieldsOptions) => {
  const [values, setValues] = useState(initialValues);

  const onChange = (field: string) => (event: Event) => {
    const value = event.nativeEvent.text;
    setValues({ ...values, [field]: value });
  };

  return { values, onChange };
};

export default useForm;
