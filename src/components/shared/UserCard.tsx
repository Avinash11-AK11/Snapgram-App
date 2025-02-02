import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;

// import { Models } from "appwrite";
// import { Link } from "react-router-dom";

// import { Button } from "../ui/button";

// type UserCardProps = {
//   user: Models.Document;
// };

// const UserCard = ({ user }: UserCardProps) => {
//   // Placeholder for follow state (e.g., in a real app, this would be managed via context or local state)
//   const [isFollowing, setIsFollowing] = React.useState(false);

//   // Toggle follow state on button click (mock functionality)
//   const handleFollow = () => {
//     setIsFollowing(!isFollowing);
//     // Here, you could also trigger an API call to follow/unfollow the user
//   };

//   return (
//     <Link to={`/profile/${user.$id}`} className="user-card">
//       <img
//         src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
//         alt={`${user.name}'s profile`}
//         className="rounded-full w-14 h-14"
//       />

//       <div className="flex-center flex-col gap-1">
//         <p className="base-medium text-light-1 text-center line-clamp-1">
//           {user.name}
//         </p>
//         <p className="small-regular text-light-3 text-center line-clamp-1">
//           @{user.username}
//         </p>
//       </div>

//       <Button
//         type="button"
//         size="sm"
//         className={`shad-button_primary px-5 ${isFollowing ? "bg-blue-500" : ""}`}
//         onClick={handleFollow}
//         aria-label={isFollowing ? "Unfollow user" : "Follow user"}
//       >
//         {isFollowing ? "Following" : "Follow"}
//       </Button>
//     </Link>
//   );
// };

// export default UserCard;
