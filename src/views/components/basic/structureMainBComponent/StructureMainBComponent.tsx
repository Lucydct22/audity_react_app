import './StructureMainBComponent.scss'

type Props = {
  children: React.ReactNode
}

const StructureMainBComponent = (props: Props) => {
  const { children } = props;

  return (
    <main className='page-main'>
      <div className='page-main__page-content'>
      { children }
      </div>
    </main>
  )
}

export default StructureMainBComponent;