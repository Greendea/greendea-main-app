import DepartmentTable from "@/components/Department/DepartmentTableIdeaTopic";
import TopicForm from "@/components/Department/TopicForm";

export default function TopicIdea({ department }) {
    return (
        <>
            {department && <>
                {!department === true && <TopicForm department={department} />}
                <DepartmentTable department={department} />
            </>
            }
        </>
    )
}
