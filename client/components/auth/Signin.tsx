import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useSignBox } from '@/store/AuthStates';
import GoogleButton from './Googlebutton';
import GithubButton from './Githubbutton';
import { GoogleSignIn } from '@/lib/client-auth';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const router = useRouter();
  const { isOpen, setOpen } = useSignBox();
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Sign In</DialogTitle>
          <GoogleButton onClick={GoogleSignIn} />
          <GithubButton onClick={() => router.push('/pricing')} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Signin;
