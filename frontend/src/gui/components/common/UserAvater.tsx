import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { CircleUserRound } from "lucide-react";

interface UserAvatarProps {
	size?: number | string;
	url?: string | null;
	className?: string;
};

const UserAvatar = ({size, url, className}: UserAvatarProps) => {
	const { user } = useAuth();

	url = url ? url : user.data?.photo ? user.data?.photo : `https://ui-avatars.com/api/?background=random&name=${user.data?.firstName}+${user.data?.lastName}&rounded=true`;
	size = size ? size : 64

	return !user.data && user.isProccessing  ? (
		<CircleUserRound size={size} />
	) : (
		<div style={{width: `${size}${typeof size === 'number' && 'px'}`, height: `${size}${typeof size === 'number' && 'px'}`}}>
			<img
				src={url || user.data?.photo}
				alt='user profile'
				className={cn("rounded-full h-full w-full",  className)}
			/>
		</div>
		
	);
};

export default UserAvatar;