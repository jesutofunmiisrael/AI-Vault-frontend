import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Publicpage from "./Componet/publicpage";

import DashboardLayout from "../Dashboardlayout";
import Private from "../Private";
import TextToSpeech from "../Texttospeach";


function App() {



  return (
    <>
    
    


      <Toaster richColors position="top-right" closeButton visibleToasts={3} />

      <Routes>
     
        <Route path="/*" element={<Publicpage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Private />} />
            <Route path="text" element={<TextToSpeech />} />
        </Route>
      </Routes>

            </>
  );
}

export default App;
