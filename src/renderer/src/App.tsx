import { Button } from "antd"

function App(): JSX.Element {
    const runCommand = (command: string) => {
        window.electron.ipcRenderer.send('run.command', { command });
    };

    return (
        <div style={{ padding: '15px' }}>
            <Button onClick={() => runCommand('null_pointer')}>NULL指针赋值</Button>
        </div>
    )
}

export default App
