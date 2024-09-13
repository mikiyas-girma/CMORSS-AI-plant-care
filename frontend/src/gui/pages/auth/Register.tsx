import { Button, buttonVariants } from "@/gui/components/ui/button";
import { Checkbox } from "@/gui/components/ui/checkbox";
import { Input } from "@/gui/components/ui/input";
import { Label } from "@/gui/components/ui/label";
import { cn } from "@/lib/utils";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

interface SignInFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmedPassword: string;
  acceptPolicy: boolean;
}

/**
 * Sign in Route Component
 * @returns JSX Component for the page.
 */
const SignIn = () => {
  const [formData, setFormData] = useState<SignInFormData>({
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
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="firstname">First name <span className="text-danger-red">*</span></Label>
          <Input autoComplete="name" type="text" id="firstname" placeholder="John" onChange={handleChange}/>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="lastname">Last name <span className="text-danger-red">*</span></Label>
          <Input autoComplete="family-name" type="text" id="lastname" placeholder="DOE" onChange={handleChange}/>
        </div>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email <span className="text-danger-red">*</span></Label>
        <Input autoComplete="email" type="email" id="email" placeholder="johndoe@xyz.com" onChange={handleChange}/>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Password <span className="text-danger-red">*</span></Label>
        <Input autoComplete="current-password" type="password" id="password" placeholder="password" onChange={handleChange}/>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Confirm password <span className="text-danger-red">*</span></Label>
        <Input autoComplete="current-password" type="password" id="confirmedPassword" placeholder="confirm your password" onChange={handleChange}/>
      </div>
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
