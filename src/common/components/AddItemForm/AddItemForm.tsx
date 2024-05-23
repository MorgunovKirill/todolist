import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"

type AddItemFormPropsType = {
  addItem: (newTitle: string) => void
  disabled?: boolean
}

export const AddItemForm: FC<AddItemFormPropsType> = React.memo(
  ({ addItem, disabled = false }) => {
    const [title, setTitle] = useState<string>("")
    const [titleError, setTitleError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (titleError) setTitleError(null)
      if (e.key === "Enter") {
        addTaskHandler()
      }
    }

    const addTaskHandler = () => {
      if (title.trim() !== "") {
        setTitleError("")
        addItem(title)
        setTitle("")
      } else {
        setTitleError("Field required")
      }
    }

    const style = {
      width: "38px",
      height: "38px",
      maxWidth: "38px",
    }

    return (
      <div>
        <TextField
          error={!!titleError}
          helperText={titleError}
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={titleError ? "error" : ""}
          id="outlined-basic"
          label={titleError ? titleError : "Type something"}
          variant="outlined"
          size="small"
          disabled={disabled}
        />
        <Button
          disabled={disabled}
          style={style}
          variant={"contained"}
          onClick={addTaskHandler}
        >
          +
        </Button>
      </div>
    )
  },
)
