import noTaskImg from "./no-tasks-img.svg";
export default function NoTasks({description}) {
  return (
    <div className="no-tasks text-center py-4">
      <img src={noTaskImg} alt="no tasks" width={"150px"}/>
      <h6>{description}</h6>
    </div>
  );
}
