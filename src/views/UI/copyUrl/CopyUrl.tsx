import { message } from 'antd';
import { RxShare1 } from "react-icons/rx";
import './copyUrl.scss'

const CopyUrl: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Copied to clipboard!',
        duration: 3,
      });
    }, 1000);
  };

  async function copyToClip() {
    await navigator.clipboard.writeText(location.href);
  }

  return (
    <>
      {contextHolder}
      <div className="copy-url-button" onClick={() => { copyToClip(); openMessage(); }}>
        <RxShare1 />
      </div>
    </>
  );
};

export default CopyUrl;