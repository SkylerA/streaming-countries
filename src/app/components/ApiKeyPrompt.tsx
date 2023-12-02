import React, { useCallback } from "react";

type Props = {
    apiKey: string,
    setApiKey: React.Dispatch<React.SetStateAction<string>>,
    storageKey: string,
    description: React.ReactNode,
    apiRegistryUrl: string
}

const ApiKeyPrompt = (props: Props) => {
    const { apiKey, setApiKey, storageKey, description, apiRegistryUrl } = props;

    // Set ApiKey and also store in LocalStorage
    const setAndStoreApiKey = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const val = event.target.value;
            localStorage.setItem(storageKey, val);
            setApiKey(val);
        },
        [setApiKey, storageKey],
    )

    return <>
        <p>
            {description}
        </p>
        <p>
            <a className="button" href={apiRegistryUrl.toString()} target="_blank">Request a Free Key here</a> and then paste it into the field bellow.
        </p>
        <label>
            <span className='label'>
                API Key
            </span>
            <input value={apiKey} onChange={setAndStoreApiKey}></input>
        </label>
    </>;
}

export default ApiKeyPrompt;