import { useState } from "react";
import { Box } from '@mantine/core';
import { Button, Group, TextInput } from "@mantine/core";
import { healthCheck } from "../hooks/healthCheck";

export function TestConnectionApi() {
  const [response, setResponse] = useState<string>("");
  const { sendMessage, isLoading, error } = healthCheck();

  const handleSubmit = async () => {
    const apiResponse = await sendMessage();
    if (apiResponse) {
      setResponse(apiResponse);
    } else if (error) {
      setResponse(`Error: ${error}`);
    }
  };

  return (
    <Box mt="auto">
      <Group align="end">
        <TextInput 
            value={response || "..."}
            className="test-connection-message"
            readOnly={true}
            disabled={true}
        />
        <Button onClick={handleSubmit} 
            loading={isLoading}
            disabled={isLoading}
            className="test-connection-button"
            >
            Test API Connection
        </Button>        
        </Group>
    </Box>
  )
};