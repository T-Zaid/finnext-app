import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { authFormSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

const formSchema = authFormSchema("sign-up");
interface CustomFormProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
}

const CustomFormInput = ({ control, name, label, placeholder }: CustomFormProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="form-item">
                    <FormLabel className="form-label">{label}</FormLabel>
                    <div className="flex flex-col w-full">
                        <FormControl>
                            <Input className="input-class" type={name === "password" ? name : name === "dataOfBirth" ? "date" : "text"} placeholder={placeholder} {...field} />
                        </FormControl>
                        <FormMessage className="form-message" />
                    </div>
                </FormItem>
            )}
        />
    )
}

export default CustomFormInput