import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button, buttonVariants } from '@/gui/components/ui/button';
import { Checkbox } from '@/gui/components/ui/checkbox';
import { Input } from '@/gui/components/ui/input';
import { Label } from '@/gui/components/ui/label';
import DangerWrapper from '@/gui/components/common/DangerWrapper';
// import { cn } from "@/lib/utils";
import { SignUpFormData } from '@/types/form';
import { signupValidation } from '@/lib/formsValidation';
import useAuth from '@/hooks/useAuth';
import { DASHBOARD_PATH } from '@/routes/paths';
import { Loader2 } from 'lucide-react';
import OAuth from '@/gui/components/OAuth';

/**
 * Sign in Route Component
 * @returns JSX Component for the page.
 */
const SignIn = () => {
  const [errors, setErrors] = useState<
    { [key in keyof SignUpFormData]: string } | null
  >(null);
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: '',
    acceptPolicy: false,
  });

  const {
    signUp,
    user: { isProcessing },
  } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = signupValidation(formData);

    if (Object.values(validationErrors).find((e) => e !== '')) {
      setErrors({ ...validationErrors });
      return;
    }

    try {
      await signUp(formData);
      toast.success(
        'Your account was register with success. Welcome to the familly'
      );
      navigate(DASHBOARD_PATH.home);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="firstName">
              First name <DangerWrapper>*</DangerWrapper>
            </Label>
            <Input
              autoComplete="name"
              type="text"
              id="firstName"
              placeholder="John"
              onChange={handleChange}
            />
            {errors?.firstName && (
              <DangerWrapper>{errors.firstName}</DangerWrapper>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="lastName">
              Last name <DangerWrapper>*</DangerWrapper>
            </Label>
            <Input
              autoComplete="family-name"
              type="text"
              id="lastName"
              placeholder="DOE"
              onChange={handleChange}
            />
            {errors?.lastName && (
              <DangerWrapper>{errors.lastName}</DangerWrapper>
            )}
          </div>
        </div>

        <div className="grid w-full items-center gap-1.5 ">
          <Label htmlFor="email">
            Email <DangerWrapper>*</DangerWrapper>
          </Label>
          <Input
            autoComplete="email"
            type="email"
            id="email"
            placeholder="johndoe@xyz.com"
            onChange={handleChange}
          />
          {errors?.email && <DangerWrapper>{errors.email}</DangerWrapper>}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">
            Password <DangerWrapper>*</DangerWrapper>
          </Label>
          <Input
            autoComplete="current-password"
            type="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
          />
          {errors?.password && <DangerWrapper>{errors.password}</DangerWrapper>}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">
            Confirm password <DangerWrapper>*</DangerWrapper>
          </Label>
          <Input
            autoComplete="current-password"
            type="password"
            id="confirmedPassword"
            placeholder="Confirm your password"
            onChange={handleChange}
          />
          {errors?.confirmedPassword && (
            <DangerWrapper>{errors.confirmedPassword}</DangerWrapper>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <div className="flex justify-start items-center space-x-2">
            <Checkbox
              id="remember"
              onClick={() => {
                setFormData({
                  ...formData,
                  acceptPolicy: !formData.acceptPolicy,
                });
              }}
            />
            <Label
              htmlFor="remember"
              className="!text-muted-foreground text-xs"
            >
              By continuing, you are agreeing to the terms and conditions of our
              application.{' '}
              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: '!p-0 !inline text-primary-green',
                })}
                to="#"
              >
                Read our Policy here.
              </Link>
            </Label>
          </div>
          {errors?.acceptPolicy && (
            <DangerWrapper>{errors.acceptPolicy}</DangerWrapper>
          )}
        </div>
        <div className="flex flex-col items-stretch gap-2">
          <Button
            size="lg"
            type="submit"
            className="!bg-primary-green hover:!bg-opacity-85 uppercase"
            disabled={isProcessing}
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register your account
          </Button>
          {/* <Link
          to={"#"}
          className={cn(buttonVariants(
            {size: 'lg'}),
            "!bg-secondary-blue hover:!bg-opacity-85 uppercase")
          }
        >
          Sign up with google
        </Link> */}
        </div>
      </form>
      <div className="flex flex-col items-stretch mt-2 gap-2">
        <OAuth />
      </div>
    </>
  );
};

export default SignIn;
