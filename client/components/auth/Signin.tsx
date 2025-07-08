'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useSignin } from '@/store/AuthStates';
import GoogleButton from './Googlebutton';
import { GoogleSignIn } from '@/lib/client-auth';

const Signin = () => {
  const { isOpen, setOpen } = useSignin();
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Sign In with Google</DialogTitle>
          <GoogleButton onClick={GoogleSignIn} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Signin;
