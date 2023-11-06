import React from "react";
class CatchError extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 你同样可以将错误日志上报给服务器
        console.log(error, errorInfo, 'didCatch');
        this.setState({
            hasError: true
        })
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        return (
            <>
                {
                    this.state.hasError ? <h1>有错误</h1> : this.props.children
                }
            </>
        )
    }
}

export default CatchError;