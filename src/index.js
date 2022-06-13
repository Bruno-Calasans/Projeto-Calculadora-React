
    import dom from 'react-dom/client'
    import { Calculator } from './components/main/calculator'
    import './index.css'

    const root = dom.createRoot(document.getElementById('root'))

    root.render(
    <>
        <h1 className='title'>Calculadora</h1>
        <Calculator/>
    </>)