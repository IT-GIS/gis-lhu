-- Add the minyak goreng sawit table variant without recreating already-published documents.
ALTER TABLE `document` MODIFY `formType` ENUM('TYPE_1', 'TYPE_2', 'TYPE_3', 'TYPE_4', 'TYPE_5', 'TYPE_6') NOT NULL;

UPDATE `document`
SET `formType` = 'TYPE_6'
WHERE LOWER(COALESCE(`sampleName`, '')) LIKE '%minyak goreng%'
   OR LOWER(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(`formPayload`, '$.sample.sampleName')), '')) LIKE '%minyak goreng%';
