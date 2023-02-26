import DepartmentTableTopic from "@/components/Department/DepartmentTableIdeaTopic";
import TopicForm from "@/components/Department/TopicForm";

export default function TopicIdea({ department, role }) {
    return (
        <>
            {department && <>
                {/* {!department === true && <TopicForm department={department} />} */}
                <TopicForm department={department} />
                <DepartmentTableTopic department={department} editable={true} downloadable={["manager", "admin", "head"].includes(role)} />
            </>
            }
        </>
    )
}
