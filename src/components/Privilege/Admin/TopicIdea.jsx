import DepartmentTable from "@/components/Department/DepartmentTableIdeaTopic";
import TopicForm from "@/components/Department/TopicForm";

export default function TopicIdea({ department }) {
    console.log(department)
    return (
        <>
            {department && <>
                {!department === true && <TopicForm department={department} />}
                <TopicForm department={department} />
                <DepartmentTable department={department} />
            </>
            }
        </>
    )
}
