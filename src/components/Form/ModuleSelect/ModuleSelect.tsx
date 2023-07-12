import Icon from '../../UI/Icon/Icon'
import moduleRegistry from '../../../registry/moduleRegistry'
import Checkboxes from '../Checkboxes/Checkboxes'

function ModuleSelect(props: any) {
  return (
    <Checkboxes
      {...props}
      type="checkbox"
      size="xl"
      data={moduleRegistry
        // .sort((mod: any, mod2: any) =>
        //   mod.reference.localeCompare(mod2.reference),
        // )
        .map(({ name, reference, icon, minor = false }: any) => ({
          label: (
            <>
              {minor && <>-</>}
              <Icon type={icon || 'col:black'} /> {name}
            </>
          ),
          value: reference,
        }))}
    />
  )
}

export default ModuleSelect
