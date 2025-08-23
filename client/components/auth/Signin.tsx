import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useSignBox } from '@/store/AuthStates';
import GoogleButton from './Googlebutton';
import GithubButton from './Githubbutton';
import { GoogleSignIn } from '@/lib/client-auth';
import { toast } from 'sonner';

const Signin = () => {
  const { isOpen, setOpen } = useSignBox();
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogTitle>Sign In with Socials</DialogTitle>
          <GoogleButton onClick={GoogleSignIn} />
          <GithubButton onClick={() => toast.error('Coming soon, stay tuned.')} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Signin;
