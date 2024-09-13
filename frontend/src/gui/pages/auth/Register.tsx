import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/gui/components/ui/button";
import { Checkbox } from "@/gui/components/ui/checkbox";
import { Input } from "@/gui/components/ui/input";
import { Label } from "@/gui/components/ui/label";
import DangerWrapper from "@/gui/components/common/DangerWrapper";
import { cn } from "@/lib/utils";
import { SignUpFormData } from "@/types/form";
import { signupValidation } from "@/lib/formsValidation";

/**
 * Sign in Route Component
 * @returns JSX Component for the page.
 */
const SignIn = () => {
  const [errors, setErrors] = useState<{[key in keyof SignUpFormData]: string} | null>(null);
  const [formData, setFormData] = useState<SignUpFormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmedPassword: '',
    acceptPolicy: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = signupValidation(formData);
    

    if (Object.values(validationErrors).find(e => e !== '')) {
      setErrors({...validationErrors});
      return;
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="firstname">First name <DangerWrapper>*</DangerWrapper></Label>
          <Input autoComplete="name" type="text" id="firstname" placeholder="John" onChange={handleChange}/>
          {errors?.firstname && <DangerWrapper>{errors.firstname}</DangerWrapper>}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="lastname">Last name <DangerWrapper>*</DangerWrapper></Label>
          <Input autoComplete="family-name" type="text" id="lastname" placeholder="DOE" onChange={handleChange}/>
          {errors?.lastname && <DangerWrapper>{errors.lastname}</DangerWrapper>}
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email <DangerWrapper>*</DangerWrapper></Label>
        <Input autoComplete="email" type="email" id="email" placeholder="johndoe@xyz.com" onChange={handleChange}/>
        {errors?.email && <DangerWrapper>{errors.email}</DangerWrapper>}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Password <DangerWrapper>*</DangerWrapper></Label>
        <Input autoComplete="current-password" type="password" id="password" placeholder="password" onChange={handleChange}/>
        {errors?.password && <DangerWrapper>{errors.password}</DangerWrapper>}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Confirm password <DangerWrapper>*</DangerWrapper></Label>
        <Input autoComplete="current-password" type="password" id="confirmedPassword" placeholder="confirm your password" onChange={handleChange}/>
        {errors?.confirmedPassword && <DangerWrapper>{errors.confirmedPassword}</DangerWrapper>}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <div className="flex justify-start items-center space-x-2">
          <Checkbox
            id="remember"
            onClick={() => {
              setFormData({...formData, acceptPolicy: !formData.acceptPolicy});
            }}
          />
          <Label htmlFor="remember" className="!text-muted-foreground">
            By continuing, you are agreeing to the terms and conditions of our application. {' '}
            <Link className={buttonVariants({
              variant: 'link',
              className: '!p-0 !inline text-primary-green'
            })} to="#">Read our Policy here.</Link>
          </Label>
        </div>
        {errors?.acceptPolicy && <DangerWrapper>{errors.acceptPolicy}</DangerWrapper>}
      </div>
      <div className="flex flex-col items-stretch gap-2">
        <Button
          size="lg"
          type="submit"
          className="!bg-primary-green hover:!bg-opacity-85 uppercase"
        >
          Register your account
        </Button>
        <Link
          to={"#"}
          className={cn(buttonVariants(
            {size: 'lg'}),
            "!bg-secondary-blue hover:!bg-opacity-85 uppercase")
          }
        >
          Sign up with google
        </Link>
      </div>
    </form>
  );
};

export default SignIn;
