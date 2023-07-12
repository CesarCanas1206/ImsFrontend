import Icon from '../Icon/Icon'
import Tooltip from '../Tooltip/Tooltip'

function HelpIcon({ text }: any) {
  return (
    <Tooltip label={text} multiline>
      <span>
        <Icon type="question" />
      </span>
    </Tooltip>
  )
}

export default HelpIcon
