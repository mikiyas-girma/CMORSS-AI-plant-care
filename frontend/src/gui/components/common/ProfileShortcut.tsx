import { LogOut } from '@/assets/Icons';
import useAuth from '@/hooks/useAuth';
import UserAvatar from './UserAvater';

const ProfileShortcut = () => {
  const {signOut, user: {data}} = useAuth();
  const username = data?.firstName + ' ' + data?.lastName

  const handleLogout = async () => {
    if (signOut) {
      try {
        await signOut();
      } catch (error) {
        console.error('Error while logging out:', error);
      }
    }
  };

  return (
    <section className="flex cursor-default items-center justify-between rounded-lg bg-gray-neutral p-2">
      <div className="flex items-center gap-2">
        <UserAvatar className="border-2 border-white" size={50}/>
        <p className="text-xs font-bold text-gray-full">{username}</p>
      </div>

      <button
        className="z-10 cursor-pointer transition-opacity duration-300 ease-in hover:opacity-65"
        onClick={handleLogout}
      >
        <LogOut color="red" size={18} />
      </button>
    </section>
  );
};

export default ProfileShortcut;
