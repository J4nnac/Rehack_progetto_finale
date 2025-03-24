/* eslint-disable react/prop-types */
import { useState } from "react";
import supabase from "../../../supabase/client";

export default function AvatarUpload({ onUpload }) {
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState("Scegli file");

    async function uploadAvatar(event) {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = fileName;

            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const avatarUrl = `https://kzfbrpoorahinpvcnrhy.supabase.co/storage/v1/object/public/avatars/${filePath}`;

            onUpload(avatarUrl);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    }


    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    }

    return (
        <div>
            <label htmlFor="file-upload" className="btn btn-custom">
                {fileName}
            </label>
            <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    handleFileChange(e);
                    uploadAvatar(e);
                }}
                disabled={uploading}
                style={{ display: "none" }}
            />
            {uploading && <p>Caricamento...</p>}
        </div>
    );
}
