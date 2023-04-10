import DepartmentTableTopic from "../../components/Department/DepartmentTableIdeaTopic";
import TopicForm from "../../components/Department/TopicForm";

export default function TopicIdea({ department, role }) {
    console.log("rolerolerolerolerole", role)
    return (
        <>
            {department && <>
                {/* {!department === true && <TopicForm department={department} />} */}
                {
                    ["manager", "head"].includes(role) && <TopicForm department={department} />
                }

                <DepartmentTableTopic
                    deletable={["admin", "head", "manager"].includes(role)}
                    department={department} editable={role !== "staff"} downloadable={["manager", "admin", "head"].includes(role)} />
            </>
            }
        </>
    )
}
