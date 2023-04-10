import Ideas from "../../components/Idea/IdeaMedium"
import { useGetIdeasQuery } from '../../redux/apiSlicers/Idea';
import moment from 'moment';

export default function Latest() {
    const { data: ideas, isLoading } = useGetIdeasQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                isLoading,
                data: data?.map(idea => {
                    return {
                        ...idea,
                        fromNow: moment(idea.createdAt).diff(moment(), "hours"),
                        isClosed: moment(idea.Topic.closureDateTopic).diff(moment(), "hours") < 0
                    }
                }).sort((a, b) => b.fromNow - a.fromNow).sort((a, b) => a.isClosed - b.isClosed)
            }
        }
    })

    return (
        <Ideas ideas={ideas} isLoading={isLoading} title="GreenDea - Latest Ideas" header="Latest Ideas" />
    )
}
