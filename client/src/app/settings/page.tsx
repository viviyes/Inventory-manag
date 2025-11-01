"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/(components)/Header";
import { useAppSelector, useAppDispatch } from "@/app/redux";
import { setIsDarkMode } from "@/app/state";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSetting[] = [
  { label: "Username", value: "Vivi_H", type: "text" },
  { label: "Email", value: "vivi@example.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

const Settings = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  
  // 初始化设置，使用 Redux store 中的 isDarkMode 值
  const [userSettings, setUserSettings] = useState<UserSetting[]>(() => {
    const settings = [...mockSettings];
    const darkModeIndex = settings.findIndex(setting => setting.label === "Dark Mode");
    if (darkModeIndex !== -1) {
      settings[darkModeIndex].value = isDarkMode;
    }
    return settings;
  });

  // 当 Redux store 中的 isDarkMode 改变时，更新本地设置状态
  useEffect(() => {
    setUserSettings(prevSettings => {
      const updatedSettings = [...prevSettings];
      const darkModeIndex = updatedSettings.findIndex(setting => setting.label === "Dark Mode");
      if (darkModeIndex !== -1) {
        updatedSettings[darkModeIndex].value = isDarkMode;
      }
      return updatedSettings;
    });
  }, [isDarkMode]);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    const setting = settingsCopy[index];
    
    // 如果是 Dark Mode 设置，更新 Redux store
    if (setting.label === "Dark Mode") {
      const newDarkModeValue = !setting.value as boolean;
      dispatch(setIsDarkMode(newDarkModeValue));
      settingsCopy[index].value = newDarkModeValue;
    } else {
      settingsCopy[index].value = !settingsCopy[index].value as boolean;
    }
    
    setUserSettings(settingsCopy);
  };

  return (
    <div className="w-full">
      <Header name="User Settings" />
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSettings];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
