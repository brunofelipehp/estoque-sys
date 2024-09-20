import { useState } from "react";

export const useBase64Convert = () => {
	const [base64, setBase64] = useState<string | null>(null);

	const convertToBase64 = (
		file: File,
	): Promise<string | ArrayBuffer | null> => {
		return new Promise((resolver, reject) => {
			const reader = new FileReader();

			reader.readAsDataURL(file);

			reader.onload = () => {
				setBase64(reader.result as string);
				resolver(reader.result);
			};
			reader.onerror = (error) => reject(error);
		});
	};

	return { base64, convertToBase64 };
};
