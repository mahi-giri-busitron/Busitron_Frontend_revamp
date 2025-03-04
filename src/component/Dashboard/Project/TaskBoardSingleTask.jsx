import { Dialog } from "primereact/dialog";

function TaskBoardSingleTask({ visible, onHide }) {
    return (
        <Dialog
            header="single task"
            visible={visible}
            position="right"
            style={{ width: "75vw", marginTop: "0px" }}
            contentStyle={{ minHeight: "100vh" }}
            onHide={onHide}
            modal
            dismissableMask
        >
            <div>Sriya code </div>
        </Dialog>
    );
}

export default TaskBoardSingleTask;
