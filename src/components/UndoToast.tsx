interface PropsInterface {
  onUndo: () => void;
  closeToast?: () => void;
}

function UndoToast(props: PropsInterface) {
  const { onUndo, closeToast } = props;

  return (
    <div>
      Task deleted.
      <button
        onClick={() => {
          onUndo();
          closeToast?.();
        }}
        style={{
          marginLeft: 10,
          color: "blue",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Undo
      </button>
    </div>
  );
}

export default UndoToast;
