import { LogOut } from "lucide-react";
import { AddTask } from "../../components/task/add-task-modal";
import { useLogout } from "../../utils/auth";
import { TaskList } from "../../components/task/task-list";

export const Dashboard = () => {
  const logout = useLogout();

  return (
    <div className="bg-primary-gradient bg-fixed bg-no-repeat min-w-screen min-h-screen py-20 px-10">
      <div className="fixed right-2 top-2 md:right-8 md:top-8">
        <button
          className="text-3xl bg-blue-600/90 text-pink-200 p-2 md:p-3 lg:p-4 rounded-full"
          onClick={logout}
        >
          <LogOut />
        </button>
      </div>
      <TaskList />
      <AddTask />
    </div>
  );
};
