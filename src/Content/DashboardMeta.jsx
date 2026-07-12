
const DashboardMeta = () => {
  const iframeStyles = {
    width: '100%',
    height: '100vh',
    border: 'none',
  };
  return (
    <>
      <iframe
        src="http://localhost:3000/public/dashboard/2ac04d8a-9c41-4d9b-8b30-3556fc0da5e9"
        style={iframeStyles}
      />
    </>
  )
}

export default DashboardMeta