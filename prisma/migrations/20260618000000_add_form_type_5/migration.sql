-- Add Form Tipe 5 support for STP result tables with specification max column.
ALTER TABLE `document` MODIFY `formType` ENUM('TYPE_1', 'TYPE_2', 'TYPE_3', 'TYPE_4', 'TYPE_5') NOT NULL;
