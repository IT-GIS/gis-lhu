-- Add Form Tipe 7 for ZA LHU without Sampling/Pengambilan Sample field.
ALTER TABLE `document` MODIFY `formType` ENUM('TYPE_1', 'TYPE_2', 'TYPE_3', 'TYPE_4', 'TYPE_5', 'TYPE_6', 'TYPE_7') NOT NULL;