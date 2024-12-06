import { Task } from "../../components/task/task";

const initData = [
  {
    id: 1,
    title: "test",
    description: "test of the description",
    dueDate: new Date(2024, 11, 4),
    done: true,
    subTasks: [
      {
        id: 1,
        title: "subtask Test",
        done: false,
      },
    ],
  },
  {
    id: 2,
    title: "test",
    description: "test of the description",
    dueDate: new Date(2024, 11, 4),
    done: false,
    subTasks: [
      {
        id: 1,
        title: "subtask Test",
        done: false,
      },
      {
        id: 2,
        title: "subtask Test",
        done: true,
      },
    ],
  },
];

export const Dashboard = () => {
  return (
    <div className="bg-primary-gradient w-screen min-h-screen py-10 px-10">
      <div className="w-full md:w-1/2 lg:1/4 mx-auto flex flex-col gap-8 ">
        {initData.map((task) => (
          <Task {...task} key={task.id} />
        ))}
      </div>
    </div>
  );
};
