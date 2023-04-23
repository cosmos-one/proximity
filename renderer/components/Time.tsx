import { format } from 'date-fns'

interface Props {
    dateString: string;
  }

export const Time: React.FC<Props> = ({ dateString }) => {
    const date = new Date(dateString)
    return (
        <time>
            {format(date, "EEEE, MMM dd yyyy, HH:mm a")}
        </time>
    )
}