import Ideas from "../../components/Idea/IdeaMedium"
import { useGetIdeasQuery } from '../../redux/apiSlicers/Idea';
import moment from 'moment';

export default function Views() {
    const { data: ideas, isLoading } = useGetIdeasQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                isLoading,
                data: data?.map(idea => {
                    return {
                        ...idea,
                        viewCount: idea.views.length,
                        isClosed: moment(idea.Topic.closureDateTopic).diff(moment(), "hours") < 0
                    }
                }).sort((a, b) => b.viewCount - a.viewCount).sort((a, b) => a.isClosed - b.isClosed)
            }
        }
    })

    return (
        <Ideas ideas={ideas} isLoading={isLoading} title="GreenDea - Most Viewed Ideas" header="Most Viewed Ideas" />
    )
}
