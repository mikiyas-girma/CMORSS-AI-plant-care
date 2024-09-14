import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./ui/button"
import { useDispatch} from "react-redux";
import { userActions } from "@/redux/user/userSlice";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "@/firebase";

const { signInSuccess } = userActions;

const OAuth = () => {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleGoogleLogin = async() => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'});
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      // Split the displayName into firstName and lastName
      const fullName = resultsFromGoogle.user.displayName ? resultsFromGoogle.user.displayName.split(' ') : [];
      const firstName = fullName[0];
      const lastName = fullName.slice(1).join(' ');
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: resultsFromGoogle.user.email,
        })
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
      }
    } catch (error) {
      console.log(error);   
    }
  }
  return (
    <Button
    className={cn(buttonVariants(
      {size: 'lg'}),
      "!bg-secondary-blue hover:!bg-opacity-85 uppercase")
    }
     variant="default" onClick={handleGoogleLogin}>
      Continue with Google
    </Button>
    )
}

export default OAuth
