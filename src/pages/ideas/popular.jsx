import Ideas from "../../components/Idea/IdeaMedium"
import { useGetIdeasQuery } from '../../redux/apiSlicers/Idea';
import moment from 'moment';

export default function Popular() {
    const { data: ideas, isLoading } = useGetIdeasQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                isLoading,
                data: data?.map(idea => {
                    return {
                        ...idea,
                        reactCount: idea.reacts.length,
                        isClosed: moment(idea.Topic.closureDateTopic).diff(moment(), "hours") < 0
                    }
                }).sort((a, b) => b.reactCount - a.reactCount).sort((a, b) => a.isClosed - b.isClosed)
            }
        }
    })

    return (
        <Ideas ideas={ideas} isLoading={isLoading} title="GreenDea - Popular Ideas" header="Popular Ideas" />
    )
}
