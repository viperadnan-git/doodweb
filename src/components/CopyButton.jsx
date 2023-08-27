import { Button, useClipboard } from "@chakra-ui/react";

function CopyButton({ text, children, afterCopy = "Copied", ...props }) {
    const { onCopy, hasCopied } = useClipboard(text);
    return (
        <Button {...props} onClick={onCopy}>
            {hasCopied ? afterCopy : children}
        </Button>
    );
}

export default CopyButton;
