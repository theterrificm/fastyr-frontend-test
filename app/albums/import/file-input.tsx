"use client";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { useMutation } from '@apollo/client';
import { CREATE_ALBUM } from "@/app/constants";
import { useToast } from "@/hooks/use-toast";

function FileInput() {
  const [createAlbum, { loading }] = useMutation(CREATE_ALBUM);
  const [dataImport, setDataImport] = useState(null);
  const { toast } = useToast();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event?.target?.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      setDataImport(sheetData);
      console.log("sheetData");
      console.log(sheetData);
    };

    reader.readAsBinaryString(file);
  };

  const handleInputChange = (e, index, field) => {
    const newData = [...dataImport];
    newData[index][field] = e.target.value;
    setDataImport(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const promises = dataImport?.map((item) =>
        createAlbum({
          variables: {
            input: {
              title: item.title,
              userId: item.id,
            },
          },
        }).then((data) => {
          console.log(data);
        })
      );

      await Promise.all(promises);

      toast({
        title: "Successful.",
        description: "All albums have been imported successfully.",
      });
    } catch (err) {
      console.error('Error creating albums:', err);
    }

    console.log(dataImport);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">File (.xlsx, csv)</Label>
          <Input id="file" onChange={handleFileUpload} type="file" />
        </div>
      </div>

      <div>
        {dataImport ? (
          <div className="py-5">
            <h2 className="text-xl font-bold">Uploaded Data:</h2>
            <form onSubmit={handleSubmit} className="space-y-3 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2>User Id</h2>
                </div>
                <div>
                  <h2>Title</h2>
                </div>
                {dataImport &&
                  dataImport.map((item, index) => (
                    <>
                      <div key={item.id}>
                        <Input
                          value={item.id}
                          onChange={(e) => handleInputChange(e, index, 'id')}
                        />
                      </div>
                      <div key={item.title}>
                        <Input
                          value={item.title}
                          onChange={(e) => handleInputChange(e, index, 'title')}
                        />
                      </div>
                    </>
                  ))}
              </div>
              <Button disabled={loading} type="submit">
                {loading ? "Loading..." : "Submit"}
              </Button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default FileInput;
