const Loader = () => (
  <div className="loader">
    <style jsx>{`
      .loader {
        border: 4px solid lightgray;
        border-top: 4px solid blue;
        border-radius: 50%;
        opacity: 0.4;
        width: 20px;
        height: 20px;
        animation: spin 2s linear infinite;
        margin-left: 25%;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
)

export default Loader
